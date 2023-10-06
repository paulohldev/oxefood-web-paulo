import axios from "axios";
import React, {useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto (){
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    const [titulo, setTitulo] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    
    
    useEffect(() => {
         if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/produto/" + state.id)
                        .then((response) => {
                           setIdProduto(response.data.id)
                           setTitulo(response.data.titulo)
                           setCpf(response.data.cpf)
                           setDataNascimento(formatarData(response.data.dataNascimento))
                           setFoneCelular(response.data.foneCelular)
                           setFoneFixo(response.data.foneFixo)
            })
        }
     }, [state])

     function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

     function salvar() {

        let produtoRequest = {
            codigo: titulo,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }
 
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/produto/" + idProduto, produtoRequest)
            .then((response) => { console.log('Produto alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/produto", produtoRequest)
            .then((response) => { console.log('Produto cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
 }
 

    return (
        <div>
        <MenuSistema />
        <div style={{marginTop: '3%'}}>


        <Container textAlign='justified' >

            <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

            <Divider />
            

        <div style={{marginTop: '4%'}}>
            <Form>
            <Form.Group widths='equal'>

<Form.Input
    width={200}
    required
    fluid
    label='titulo'
    maxLength="400"
/>

<Form.Input width={7}
    required
    fluid
    label='codigo de Produto'
    >
    <InputMask
        required
        mask="999999999-99"
    /> 
</Form.Input>
</Form.Group>
<Form.Field
          control={TextArea}
          label='Descrição'
          placeholder='Informe a descrição do produto'
        />
        <Form.Group>
        <Form.Input
                                    required
                                    fluid
                                    label='Valor '
                                    width={6}>                                   
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega minimo em minutos'
                                    width={6}
                                    placeholder= '30'>

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega maximo em minutos'
                                    width={6}
                                    placeholder= '40'>
                               </Form.Input>
        </Form.Group>
            </Form>
            <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                    
                    </div>
                    </div>
                    </Container>
            </div>                
        
            

</div>
    );
}