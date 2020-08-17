// https://docs.cypress.io/api/introduction/api.html

//Listagem de Elementos
describe("Verificar se a listagem está sendo feita", () => {
  it("Visita a página Home do app", () => {
    cy.visit("/");
    cy.contains("tbody>tr>td", "1");
    cy.wait(2000);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});

//Cadastro de Elementos
describe("Verificar se o cadastro está sendo feito corretamente", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  it("Visita a página Admin do app", () => {
    cy.visit("/admin");
    cy.get("#name").type("Arthur Oliveira");
    cy.get("#cpf").type("11111111111111");
    cy.get("#phone").type("34999998080");
    cy.get("#email").type("teste@teste.com");
    cy.wait(1000);
    cy.get(".btn").click();
    cy.wait(5000);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  //Validação do cadastro
  it("Verificar se o cadastro foi feito", () => {
    cy.visit("/");
    cy.get("tbody tr")
      .last()
      .find("td")
      .first()
      .should("contain", "4");
  });
});

//Edição de dados
describe("Carregar os dados para editar", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  it("Verificar se os campos estão sendo preenchidos da editar", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#edit")
      .first()
      .click();
    cy.wait(1000);
    cy.get("#name").should("have.value", "My name 1");
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  //Validação do cadastro
  it("Editar valor do campo nome", () => {
    cy.get("#name")
      .clear()
      .type("Nome teste 1");
    cy.get("#email")
      .clear()
      .type("teste@gmail.com");
    cy.get(".btn-submit").click();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});

//Edição de dados
describe("Deletar dado", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  it("Clicar no botão para deletar primeira linha de dados", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#delete")
      .first()
      .click();
    cy.wait(1000);
    cy.get("table")
      .find("tr")
      .should("have.length", 4);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
