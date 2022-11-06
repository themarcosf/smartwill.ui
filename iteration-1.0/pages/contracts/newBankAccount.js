//npm module
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
//project module
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
//compiled smart contract
import smartwill from "../../ethereum/smartwill";
//React components
import Layout from "../../components/Layout";

class SmartWillContract extends Component {
  state = {
    accountName: "",
    bankName: "",
    branchNumber: "",
    accountNumber: "",
    accountDigit: "",
    errorMessage: "",
    loading: false,
  };

  /*
  getInitialProps *AND* static keyword: check explanation at /contracts/index.js
  */
  static async getInitialProps(props) {
    const contractAddress = props.query.contractAddress;

    return { contractAddress };
  }

  //event handler to create new Bank Account
  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await smartwill(this.props.contractAddress)
        .methods.createBankAccount(
          this.state.accountName,
          this.state.bankName,
          this.state.branchNumber,
          this.state.accountNumber,
          this.state.accountDigit
        )
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/contracts/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({
        errorMessage: `O sistema identificou um erro. Favor validar as informações do formulário e tentar novamente. Caso o erro persista, estamos à disposição através do e-mail contato@smartwill.com.br. Para agilizar seu atendimento, favor descrever a situação de erro e incluir a seguinte descrição: ${err.message}`,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Criar nova conta bancária</h3>
        <h4>Parâmetros obrigatórios:</h4>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Nome da conta:</label>
            <Input
              focus
              value={this.state.accountName}
              onChange={(e) => this.setState({ accountName: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Banco:</label>
            <Input
              focus
              value={this.state.bankName}
              onChange={(e) => this.setState({ bankName: e.target.value })}
              list="banks"
            />
            <datalist id="banks">
              <option value="BTG Pactual">BTG Pactual</option>
              <option value="Nubank">Nubank</option>
              <option value="Itaú">Itaú</option>
              <option value="Bradesco">Bradesco</option>
            </datalist>
          </Form.Field>
          <Form.Field>
            <label>Agência:</label>
            <Input
              focus
              value={this.state.branchNumber}
              onChange={(e) => this.setState({ branchNumber: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Conta:</label>
            <Input
              focus
              value={this.state.accountNumber}
              onChange={(e) => this.setState({ accountNumber: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Dígito:</label>
            <Input
              focus
              value={this.state.accountDigit}
              onChange={(e) => this.setState({ accountDigit: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading}>Nova conta bancária</Button>
        </Form>
      </Layout>
    );
  }
}

export default SmartWillContract;
