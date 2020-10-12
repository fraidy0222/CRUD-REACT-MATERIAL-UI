import React from "react";
import Container from "@material-ui/core/Container";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";

// Dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Styles
const table = {
  table: {
    minWidth: 650,
  },
};
const hideLastBorder = {
  hideLastBorder: {
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
};
const button = {
  marginTop: 10,
  marginBottom: 10,
};
const text = {
  marginBottom: 20,
};

function createData(id, personaje, anime, actions) {
  return { id, personaje, anime, actions };
}

const rows = [
  createData(1, "Lerdis", "loren ipsum 1"),
  createData(2, "Fraidy", "loren ipsum 2"),
  createData(3, "Francito", "loren ipsum 3"),
  createData(4, "Idalis", "loren ipsum 4"),
  createData(5, "Frank", "loren ipsum 5"),
];

export default class Crud extends React.Component {
  state = {
    rows: rows,
    form: {
      id: "",
      personaje: "",
      anime: "",
    },
    modelInsertar: false,
    modelEditar: false,
    modalEliminar: false,
  };
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  mostrarModalInsertar = () => {
    this.setState({
      modelInsertar: true,
    });
  };
  ocultarModalInsertar = () => {
    this.setState({
      modelInsertar: false,
    });
  };

  mostrarModalEditar = (registro) => {
    this.setState({
      modelEditar: true,
      form: registro,
    });
  };
  ocultarModalEditar = () => {
    this.setState({
      modelEditar: false,
    });
  };
  mostrarModalEliminar = () => {
    this.setState({ modalEliminar: true });
  };
  ocultarModalEliminar = () => {
    this.setState({ modalEliminar: false });
  };

  insert = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.rows.length + 1;
    var lista = this.state.rows;
    lista.push(valorNuevo);
    this.setState({ rows: lista, modelInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.rows;
    lista.map((registro) => {
      if (dato.id === registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      return contador++;
    });
    this.setState({ rows: lista, modelEditar: false });
  };
  eliminar = (dato) => {
    var opcion = window.confirm("¿Estás seguro que deseas eliminar este dato?");
    if (opcion) {
      var contador = 0;
      var lista = this.state.rows;
      lista.map((registro) => {
        if (registro.id === dato.id) {
          lista.splice(contador, 1);
        }
        return contador++;
      });
      this.setState({ rows: lista, modalEliminar: false });
    }
  };
  render() {
    return (
      <div>
        <Container maxWidth="md">
          <Button
            variant="contained"
            color="primary"
            style={button}
            onClick={this.mostrarModalInsertar}
          >
            Añadir Data
          </Button>
          <Dialog
            open={this.state.modelInsertar}
            onClose={this.ocultarModalInsertar}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Añadir Personaje Anime
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                value={this.state.rows.length + 1}
                InputProps={{
                  readOnly: true,
                }}
                style={text}
              />
              <TextField
                autoFocus
                margin="dense"
                name="personaje"
                placeholder="Personaje"
                type="text"
                fullWidth
                style={text}
                value={rows.personaje}
                onChange={this.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="anime"
                placeholder="Anime"
                type="text"
                fullWidth
                value={rows.anime}
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.ocultarModalInsertar}>Cancel</Button>
              <Button onClick={this.insert}>Save</Button>
            </DialogActions>
          </Dialog>
          {/* dialog insertar */}
          <Dialog
            open={this.state.modelEditar}
            onClose={this.ocultarModalEditar}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Editar Personaje Anime
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                style={text}
                value={this.state.form.id}
              />
              <TextField
                autoFocus
                margin="dense"
                name="personaje"
                fullWidth
                style={text}
                value={this.state.form.personaje}
                onChange={this.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="anime"
                fullWidth
                value={this.state.form.anime}
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.ocultarModalEditar}>Cancel</Button>
              <Button onClick={() => this.editar(this.state.form)}>Save</Button>
            </DialogActions>
          </Dialog>
          {/* dialog editar */}
          <TableContainer component={Paper}>
            <Table style={table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Personajes</TableCell>
                  <TableCell align="left">Animes</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row) => (
                  <TableRow key={row.id} style={hideLastBorder}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.personaje}</TableCell>
                    <TableCell align="left">{row.anime}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        onClick={() => this.mostrarModalEditar(row)}
                        aria-label="editar"
                      >
                        <EditIcon style={{ color: green[500] }} />
                      </IconButton>
                      <IconButton
                        onClick={() => this.eliminar(row)}
                        aria-label="delete"
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
}
