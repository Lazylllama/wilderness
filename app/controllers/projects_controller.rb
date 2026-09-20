class ProjectsController < InertiaController
    before_action :require_camp_access
    before_action :require_authentication
    before_action :set_project, only: %i[edit update ship]

    def new
        redirect_to camp_path
    end
    def edit
        redirect_to camp_path
    end

    def create
        project = current_user.projects.new(project_params)
        project.plot_index ||= next_free_plot
        if project.save
            SyncHackatimeJob.perform_later(current_user)
            redirect_to camp_path, notice: "tent pitched"
        else
            redirect_to camp_path, inertia: { errors: project.errors }
        end
    end

    def update
        if @project.update(project_params)
            SyncHackatimeJob.perform_later(current_user)
            redirect_to camp_path, notice: "camp updated"
        else
            redirect_to camp_path, inertia: { errors: @project.errors }
        end
    end
    def ship
        @project.update!(status: "shipped", shipped_at: Time.current)
        redirect_to camp_path, notice: "shipped! the fire roars."
    end

    def sync
        SyncHackatimeJob.perform_later(current_user)
        redirect_to camp_path
    end

  private

  def set_project
    @project = current_user.projects.find(params[:id])
  end

  def next_free_plot
    taken = current_user.projects.pluck(:plot_index)
    (0...8).find { |index| taken.exclude?(index) } || 0
  end

  def project_params
    params.permit(:name, :description, :repo_url, :demo_url, :plot_index, hackatime_projects: [])
  end
end
