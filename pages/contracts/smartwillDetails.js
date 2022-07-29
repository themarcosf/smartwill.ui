//npm modules
import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
//project module
import { Link } from "../../routes";
//compiled smart contract
import Smartwill from "../../ethereum/smartwill";
//React component
import Layout from "../../components/Layout";

/*
getInitialProps *AND* static keyword: check explanation at /contracts/index.js
*/

class SmartWillDetails extends Component {
  static async getInitialProps(props) {
    const smartwill = Smartwill(props.query.contractAddress);

    const contractAddress = props.query.contractAddress;
    const manager = await smartwill.methods.manager().call();
    const bankAccounts = await smartwill.methods
      .getDeployedBankAccounts()
      .call();

    return { contractAddress, manager, bankAccounts };
  }

  //display details of each bankAccount
  renderBankAccounts() {
    const items = this.props.bankAccounts.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/contracts/${this.props.contractAddress}/${address}`}>
            <a>Ver detalhes da conta bancária</a>
          </Link>
        ),
        fluid: true,
        style: { overflowWrap: "break-word" },
      };
    });

    return <Card.Group items={items.reverse()} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <p>
            Obrigado pelo seu interesse em conhecer melhor a plataforma. Ainda
            estamos em fase de desenvolvimento e testes, então as
            funcionalidades disponíveis são limitadas e tem como objetivo apenas
            oferecer uma vaga ideia do produto final. Caso queira conhecer
            melhor o produto e se manter informado(a), não deixe de cadastrar
            seu e-mail em nosso site. Feedbacks são apreciados.
          </p>
          <h3>Orientações de uso:</h3>
          <ol>
            <li>
              Abaixo é possível incluir informações de contas bancárias no
              smartwill. Basta clicar no botão e informar os dados necessários.
            </li>
          </ol>
          <Link
            route={`/contracts/${this.props.contractAddress}/newBankAccount`}
          >
            <a>
              <Button
                content="Nova conta bancária"
                icon="add circle"
                labelPosition="right"
                floated="right"
              />
            </a>
          </Link>
          <h3>Lista de contas bancárias</h3>
          {this.renderBankAccounts()}
        </div>
      </Layout>
    );
  }
}

export default SmartWillDetails;
