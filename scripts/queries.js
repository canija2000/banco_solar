const { pool } = require("../config/db");


//añadir usuario a la bd

const addUserQuery = async (datos) => {
  try {
    const query = {
      text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
      values: datos,
    };
    // se almacenara en result el resultado de la consulta 
    //enviada al pool
    console.log(datos)
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

const getUserQuery = async () => {
  try {
    const query = {
      text: "SELECT * FROM usuarios",
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const editUserQuery = async (datos) => {
  try {
    const query = {
      text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3",
      values: datos,
    };
    const result = await pool.query(query);
    if (result.rowCount === 0) {
      throw new Error("Usuario No encontrado");
    } else {
      result.rows[0];
    }
  } catch (error) {
    return error;
  }
};

const deleteUserQuery = async (id) => {
  try {
    const query = {
      text: "DELETE FROM usuarios WHERE id = $1",
      values: [id],
    };
    const result = await pool.query(query);
    if (result.rowCount === 0) {
      throw new Error("No se encontro el usuario");
    }
  } catch (error) {
    return error;
  }
};

const addTranferQuery = async (datos) => {
  // emisor
  const { emisor, receptor, monto } = datos;
  const { id: emisor_id } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];
  //receptor
  const { id: receptor_id } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];
  const registerTranfer = {
    text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
    values: [emisor_id, receptor_id, monto],
  };
  const updateBalanceEmisor = {
    //descontamos el monto al emisor
    text: "UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2 RETURNING *",
    values: [monto, emisor],
  };
  const updateBalanceReceptor = {
    //sumamos el monto al receptor
    text: "UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2 RETURNING *",
    values: [monto, receptor],
  };

  try {
    //iniciamos la transaccion
    await pool.query("BEGIN");
    await pool.query(registerTranfer);
    await pool.query(updateBalanceEmisor);
    await pool.query(updateBalanceReceptor);
    await pool.query("COMMIT");
    return true;
  } catch (error) {
    //si hay un error se hace un rollback
    await pool.query("ROLLBACK");
    return error;
  }
};

const getTransferQuery = async () => {
  try {
    const querys = {
      text: `SELECT
        e.nombre AS emisor,
        r.nombre AS receptor,
        t.monto,
        t.fecha
      FROM
        transferencias t
      JOIN
        usuarios e ON t.emisor = e.id
      JOIN
        usuarios r ON t.receptor = r.id;`,
      rowMode: "array",
    };
    const result = await pool.query(querys);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addUserQuery,
  getUserQuery,
  editUserQuery,
  deleteUserQuery,
  addTranferQuery,
  getTransferQuery
};


