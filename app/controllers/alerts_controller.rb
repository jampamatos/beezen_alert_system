class AlertsController < ApplicationController

  def index
    @alerts = current_user.alerts
    #@alerts = Alert.all
  end

  def create
    @alert = current_user.alerts.build(alert_params)

    if @alert.save
      render json: @alert, status: :created
    else
      render json: { errors: @alert.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def alert_params
    params.require(:alert).permit(:alert_type, :tag, :description, :origin)
  end
end
