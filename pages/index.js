//npm modules
import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
//project modules
import web3 from "../ethereum/web3";
import { Link, Router } from "../routes";
//compiled smart contract
import factory from "../ethereum/factory";
//React components
import Layout from "../components/Layout";


/*
definition of class-based component in order to use the life-cycle method getInitialProps
getInitialProps is a helper method defined and used exclusively by 'next.js'
it loads initial data inside of a React component prior to rendering
in this case, the factory instance is used to retrieve a list of deployed smartWills

static keyword: defines a class method
class methods are not assigned to instances of the class
instead, the method is assigned to the class itself
'next.js' requires static keyword in order to retrieve initial data without attempting to render the component
*/

class SmartWillIndex extends Component {
  state = {
    loading: false,
  };

  static async getInitialProps() {
    const smartWills = await factory.methods.getDeployedSmartWills().call();
    return { smartWills };
  }

  //event handler to create new smartWill
  onClick = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const accounts = await web3.eth.getAccounts();
    await factory.methods.createSmartWill().send({
      from: accounts[0],
    });
    this.setState({ loading: false });

    Router.pushRoute("/");
  };

  //display details of each smartWill
  renderSmartWills() {
    const items = this.props.smartWills.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/contracts/${address}`}>
            <a>Ver Contrato</a>
          </Link>
        ),
        fluid: true,
        style: { overflowWrap: "break-word" },
      };
    });

    return <Card.Group items={items.slice(items.length - 5).reverse()} />;
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
            melhor o produto e se manter informado, não deixe de cadastrar seu
            e-mail em nosso site. Feedbacks são bem-vindos :)
          </p>
          <h3>Orientações de uso:</h3>
          <ol>
            <li>
              Abaixo é possível visualizar e interagir com a lista completa de
              <i> smartWills</i> criados nesse ambiente de testes. Na versão
              final do produto, cada usuário terá acesso apenas aos seus
              próprios contratos.
            </li>
            <li>
              Para criar novos contratos, é necessária a utilização do navegador
              Chrome com a extensão da Metamask instalada. A Metamask é uma
              carteira de criptomoedas usada para interagir com a blockchain.
            </li>
            <li>
              Durante todo a etapa de desenvolvimento e testes, estamos
              utilizando a Rinkeby, uma <i>testnet</i> baseada em Ethereum.
              Portanto, não há custos envolvidos e as informações cadastradas
              para simulação devem ser fictícias. Em hipótese alguma devem ser
              concedidas informações verdadeiras.
            </li>
            <li>
              Optamos por não disponibilizar mecanismos de segurança nesse
              ambiente de testes. Portanto, é possível interagir e alterar
              contratos de terceiros. Os referidos mecanismos ainda estão sendo
              validados e serão disponibilizados para testes assim que atingirem
              uma etapa mais avançada de maturação.
            </li>
            <li>
              Por fim, pedimos a gentileza de nos reportar caso encontre algum
              bug no sistema.
            </li>
          </ol>
              <Button
                floated="right"
                content="Novo Contrato"
                labelPosition="right"
                icon="add circle"
                onClick={this.onClick}
                loading={this.state.loading}
              />
              <h3>Lista dos cinco últimos contratos</h3>
          {this.renderSmartWills()}
        </div>
      </Layout>
    );
  }
}

export default SmartWillIndex;
