class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
        before_action :authenticate_user!, unless: :skip_authenticate_user?
        protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }
      
        private
      
        def skip_authenticate_user?
          (controller_name == 'registrations' && action_name == 'create') ||
          (controller_name == 'sessions' && action_name == 'create')
        end
end