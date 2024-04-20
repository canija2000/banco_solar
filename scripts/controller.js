const {
  addUserQuery,
  getUserQuery,
  editUserQuery,
  deleteUserQuery,
  addTranferQuery,
  getTransferQuery,
} =  require("./queries")

const path = require("path");


//ruta pcpal
const home = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
}

//agg usuario
const aggUser = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const datos = [nombre, balance];
    const newUser = await addUserQuery(datos);
    console.log(newUser);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get usuario

const getUser = async (req, res) => {
  try {
    const users = await getUserQuery();
    res.status(200).send(users);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

//edit usuario

const editUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { nombre, balance } = req.body;

    const datos = [nombre, balance, id];
    const editUser = await editUserQuery(datos);
    res.status(200).send(editUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete usuario

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    const deleteUser = await deleteUserQuery(id);
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//añadir transferencia

const addTranfer = async (req, res) => {
  try {
    const datos = req.body;
    console.log(datos);

    const result = await addTranferQuery(datos);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTranfer = async (req, res) => {
  try {
    const result = await getTransferQuery();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {home, aggUser, getUser, editUser, deleteUser, addTranfer, getTranfer} ;
