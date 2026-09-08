module Admin
  class LogsController < BaseController
    def index
        render inertia "admin/logs", props: {
            campers: User.order(:email).limit(200).map {|user| camper_props(user)},
        }
    end

    def create
        user = User.find(params[:user_id])
        amount = params[:amount].to_i
        return redirect_to admin_logs_path, notice: "Amount is 0" if amount.zero?
        LogTransaction.create!(
            user: user,
            amount: amount,
            source: "adjustment",
            memo: params[:memo].presence || "adjusted by #{current_user.display_name}"
        )
        verb = amount.positive? ? "granted": "taken back"
        redirect_to admin_logs_path,
        notice: "#{verb} #{amount.abs} logs #{amount.positive? ? 'to':'from'} #{user.display_name}"
    end
    private
    def balances
        @balances ||= LogTransaction.group(:user_id).sum(:amount)
    end

    def camper_props(user){
        id: user.id,
        name: user.display_name,
        email: user.email,
        balance: balances.fetch(user.id, 0)
    }
    end

    def entry_props(entry)
    {
        id: entry.id,
        user: entry.user.display_name,
        email: entry.user.email,
        amount: entry.amount,
        source: entry.source,
        memo: entry.memo,
        created_at: entry.created_at
    }
    end
  end
end