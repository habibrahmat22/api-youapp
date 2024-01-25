module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull : {
        args : false,
        message: 'Please enter your email address',
      },
      unique: {
        args: true,
        message: 'Email already exists',
      },
      validate: {
        isEmail: {
          message: 'Please enter a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    gender:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    birthday:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    horoscope:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    zodiac:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    height:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    weight:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    img_url:{
      type :DataTypes.STRING,
      allowNull : true
    }, 
    interest:{
      type :DataTypes.STRING,
      allowNull : true
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};