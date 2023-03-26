class CreateAlerts < ActiveRecord::Migration[7.0]
  def change
    create_table :alerts do |t|
      t.string :alert_type
      t.string :tag
      t.text :description
      t.string :origin
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
