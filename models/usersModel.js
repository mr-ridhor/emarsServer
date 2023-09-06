module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    get() {
      // Use DATE_FORMAT to format the 'dob' date field as 'DD-MM-YYYY'
      return sequelize.fn('DATE_FORMAT', this.getDataValue('dob'), '%d-%m-%Y');
    },
  }
});
return User;
}
