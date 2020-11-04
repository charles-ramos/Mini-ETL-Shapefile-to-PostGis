import React, { useContext, useState, useEffect } from 'react'; //3 hooks de estados 
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../../services/api';

import "./styles.css";
import {Context1} from '../../context/ContextProvider';
import shape from '@material-ui/core/styles/shape';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    blockSize: '30px',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '75%',
  },
  text: {
    margin: theme.spacing(0),
    fontSize: '30px',
    minWidth: '75%',
  },
  select: {
    fontSize: '20px',
    minWidth: '50%',
    margin: theme.spacing(0) 
  }
}));


export default function ControlledOpenSelect() {
  const [local, setLocal] = useState();
  const [portal, setPortal] = useState();
  const [table, setTable] = useState(''); 
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [bdList2, setBdList] = useState('');
  const [lista, setLista] = useState();
  const [open, setOpen] = React.useState(false); 
  const classes = useStyles();
  const [campos, setCampos] = React.useState('');
  const handleChange = (event) => {
    setCampos(event.target.value);
    bdList(event.target.value);
  };
  const [Files, setFiles] = useState([]); //lista vazia
  const {shapeReturn, setShapeReturn} = useContext(Context1); //chamando o AppContext 

  useEffect(() => {}, [shapeReturn]);

  const bdList = (tableSelected) => {
    setLoading(true);
    api({  
      method: 'post',
      url: '/fields',
      data: { 
        "host": local,
        "porta": portal,
        "bd": tableSelected, 
        "usuario": user,
        "senha": password
      }
    })
    .then(response => { 
        console.log('olha a lista ' + JSON.stringify(lista))
        setShapeReturn(response.data); 
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  } 

  const listItems = shapeReturn.map(
    (value, index) =>
    <option className="fields" id={index + 1} key={index}>{value}</option>
  );

  function inputFill() { //func 
    if (shapeReturn.length > 0){
      return (
        shapeReturn.map(
          (value, index) =>
          <option className="fields" id={index + 1} key={index}>{value}</option>
        )
      )}
    
    else {
      return (
        <>

          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={bdList}><em>None</em></MenuItem>
        </>
      )
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.text}>     
      <FormControl className={classes.text}>
          <select value={campos} onChange={handleChange} className={classes.select}>
            <option value={0} selected disabled>Selecione a Tabela</option>

            { shapeReturn && shapeReturn.length > 0 && 
              shapeReturn.map((item)=>{
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>          
      </FormControl>
    </div>
  );
}