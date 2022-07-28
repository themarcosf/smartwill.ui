//npm module
import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
//compiled smart contract
import BankAccount from "../../ethereum/bankAccount";
//React components
import Layout from "../../components/Layout";
import OptionalParametersForm from "../../components/OptionalParametersForm";

class BankAccountDetails extends Component {
  static async getInitialProps(props) {
    const bankAccount = BankAccount(props.query.bankAccountAddress);

    const contractAddress = props.query.contractAddress;
    const bankAccountAddress = props.query.bankAccountAddress;
    const manager = await bankAccount.methods.manager().call();
    const bankAccountsProps = await bankAccount.methods.account().call();

    return { contractAddress, bankAccountAddress, manager, bankAccountsProps };
  }

  renderDetails() {
    const {
      bankName,
      branchNumber,
      accountNumber,
      accountDigit,
      password,
      balance,
      description,
    } = this.props.bankAccountsProps;

    const items = [
      {
        header: bankName,
        meta: "Nome do banco",
        description: "Banco em que a conta bancária foi criada",
        style: { overflowWrap: "break-word" },
      },
      {
        header: branchNumber,
        meta: "Número da agência",
        description: "Agência bancária de cadastro",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${accountNumber}-${accountDigit}`,
        meta: "Número da conta",
        description: "Referência ao número e ao dígito da conta bancária",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${password ? password : "não informado"}`,
        meta: "Senha da conta",
        description: "Senha de acesso à conta bancária",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${balance ? balance : "não informado"}`,
        meta: "Saldo da conta",
        description: "Saldo da conta para simples referência",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${description ? description : "não informado"}`,
        meta: "Descrição da conta",
        description: "Detalhes sobre a natureza ou destino da conta bancária",
        style: { overflowWrap: "break-word" },
        fluid: description.length > 50 ? true : false,
      },
    ];

    return <Card.Group items={items.reverse()} />;
  }

  render() {
    return (
      <Layout>
        <h3>Detalhes da conta bancária</h3>
        <h4>Nome da conta: {this.props.bankAccountsProps.accountName}</h4>
        <h5 style={{ marginTop: "14px", marginBottom: "26px" }}>
          Responsável: {this.props.manager}
        </h5>
        <Grid>
          <Grid.Column width={10}>{this.renderDetails()}</Grid.Column>
          <Grid.Column width={5}>
            <OptionalParametersForm
              contractAddress={this.props.contractAddress}
              address={this.props.bankAccountAddress}
            />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default BankAccountDetails;
