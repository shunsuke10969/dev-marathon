describe('顧客情報入力フォームのテスト', () => {
  it('顧客情報を入力して送信し、成功メッセージを確認する', () => {
    cy.visit('/shuns-watanabe/customer/add.html');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.fixture('customerData').then((data) => {
      const uniqueContactNumber = `03-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

      cy.get('#companyName').type(data.companyName);
      cy.get('#industry').type(data.industry);
      cy.get('#contact').type(uniqueContactNumber);
      cy.get('#location').type(data.location);
    });

    cy.get('#customer-form').submit();

    cy.get('@alertStub').should('have.been.calledOnceWith', '顧客情報が正常に保存されました。');

    cy.get('#companyName').should('have.value', '');
    cy.get('#industry').should('have.value', '');
    cy.get('#contact').should('have.value', '');
    cy.get('#location').should('have.value', '');
    cy.wait(5000);
  });
});

describe('追加テスト①', () => {
  it('入力欄が表示されていること', () => {
    cy.visit('/shuns-watanabe/customer/add.html');

    cy.get('#companyName').should('exist');
    cy.get('#industry').should('exist');
    cy.get('#contact').should('exist');
    cy.get('#location').should('exist');
  });
});

describe('追加テスト②', () => {
  it('顧客一覧画面へアクセスできること', () => {
    cy.visit('/shuns-watanabe/customer/list.html');

    cy.url().should('include', '/customer/list.html');
    cy.get('body').should('be.visible');
  });
});
