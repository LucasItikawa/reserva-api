module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define("Reserva", {
    local: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Reserva;
};
