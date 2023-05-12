const db = require('../utils/database')

const { DataTypes } = require('sequelize')

const Tasks = db.define('tasks', {
  // id, title, description, completed
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = Tasks