class TentsController < InertiaController
    before_action :require_authentication
    before_action :set_tent, only:%i[edit update ship]

    def new
        redirect_to camp_path
    end
    def edit
        redirect_to camp_path
    end

    def create
        tent = current_user.tents.new(tent_params)
        tent.plot_index ||= next_free_plot
        if tent.save
            SyncHackatimeJob.perform_later(current_user)
            redirect_to camp_path, notice: "tent pitched"
        else
            redirect_to camp_path, inertia: {errors: tent.errors}
        end
    end

    def update
        if @tent.update(tent_params)
            SyncHackatimeJob.perform_later(current_user)
            redirect_to camp_path, notice: "camp updated"
        else 
            redirect_to camp_path, inertia: {errors: @tent.errors}
        end
    end
    def ship
        @tent.update!(status: "shipped", shipped_at: Time.current)
        redirect_to camp_path, notice: "shipped! the fire roars."
    end

    def sync
        SyncHackatimeJob.perform_later(current_user)
        redirect_to camp_path
    end

  def set_tent
    @tent = current_user.tents.find(params[:id])
  end
  def next_free_plot
    taken current_user.tents.pluck(:plot_index)(0...8).find {|index| taken.exclude?(index)} || 0
  end

  def tent_params
    params.expect(tent: [:name, :description, :repo_url, :demo_url, :plot_index,{hackatime_projects:[]}])
  end
end



