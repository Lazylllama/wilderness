module Authentication
  extend ActiveSupport::Concern
  included do
    helper_method :current_user, :signed_in?, :camp_access?
  end

  private
  def current_user
    return @current_user if defined?(@current_user)
    @current_user = session[:user_id] && User.find_by(id: session[:user_id])
  end

  def signed_in?
    current_user.present?
  end

  def camp_access?
    current_user.present? && current_user.camp_access?
  end

  def sign_in(user)
    reset_session
    session[:user_id] = user.id
    @current_user = user
  end

  def sign_out
    reset_session
    @current_user = nil
  end

  def require_authentication
    return if signed_in?
    redirect_to root_path, alert: "set up your tent first!"
  end

  def require_camp_access
    return if camp_access?
    redirect_to root_path, notice: {
      title: "wilderness isn't open yet",
      description: "you're on the list. we'll let you the moment the fire's lit.",
      iconName: "Tent",
      variant: "normal"
    }
end
end
