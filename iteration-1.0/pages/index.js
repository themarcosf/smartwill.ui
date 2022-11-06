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
            melhor o produto e se manter informado(a), não deixe de cadastrar
            seu e-mail em nosso site. Feedbacks são apreciados.
          </p>
          <h3>Orientações de uso:</h3>
          <ol>
            <li>
              Abaixo é possível visualizar e interagir com uma lista dos cinco
              últimos smartWills criados nesse ambiente de testes. Na versão
              final do produto, cada usuário terá acesso apenas aos seus
              próprios contratos.
            </li>
            <li>
              Caso essa seja sua primeira interação com uma blockchain, não se
              preocupe. Acreditamos que a experiência do usuário deve ser igual
              à utilização de um cartão de crédito: não é necessário conhecer a
              tecnologia subjacente para pagar as contas. Assim, enquanto outros
              aplicativos fazer necessária a utilização de extensões como
              Metamask para criação de novos contratos, o smartWill é
              completamente agnóstico e a navegação e interação ocorre de modo
              idêntico à navegação em qualquer outro site ou plataforma.
            </li>
            <li>
              Uma forma de imaginar uma blockchain como a Ethereum seria um
              computador enorme, descentralizado, extremamente seguro, porém
              lento. Por design, cada bloco de informações é adicionado apenas a
              cada 15 segundos, portanto, qualquer nova informação registrada na
              rede tomará entre 15 e 30 segundos. Futuramente, criaremos
              interações adicionais com o objetivo de direcionar o usuário
              enquanto a transação é processada.
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
              Todas as transações registradas na plataforma podem ser
              consultadas e verificadas em https://rinkeby.etherscan.io. Basta
              copiar o hash da transação (para identificação, os hashs começam
              em "0x...") e colar no campo de busca do site.
            </li>
            <li>
              Por fim, pedimos a gentileza de nos reportar através do e-mail
              contato@smartwill.com.br caso encontre algum bug no sistema.
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
