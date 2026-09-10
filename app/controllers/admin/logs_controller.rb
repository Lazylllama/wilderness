module Admin
  class LogsController < BaseController
    def index
        render inertia "admin/logs", props: {
            transactions: scoped_transactions.map {|entry| entry_props(entry)},
            totals: {
                circulating: LogTransaction.sum(:amount),
                granted: LogTransaction.grants.where("amount > 0").sum(:amount),
                spent: -LogTransaction.where("amount < 0").sum(:amount)
            },
            source: params[:source].to_s,
            sources: LogTransaction::SOURCES,
            flash_notice: flash_notice
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
    def scoped_transactions
        scope = LogTransaction.includes(:user).recent.limit(100)
        LogTransaction::SOURCES.include?(params[:source])? scope.where(source: params[:source]): scope
    end
    def balances
        @balances ||= LogTransaction.group(:user_id).sum(:amount)
    end

    def entry_props(entry)
    {
        id: entry.id,
        user_id: entry.user_id,
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