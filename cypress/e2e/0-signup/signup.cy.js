describe("회원가입 테스트", () => {
  it("사용자는 이메일과 비밀번호를 사용해서 회원가입한다.", () => {
    // given - 회원가입 페이지에 접근한다.
    cy.visit("/signup");
    // when - 이메일과 비밀번호를 입력한다.

    cy.get("[data-cy=signupButton").as("signupButton");
    cy.get("@signupButton").should("be.disabled");

    cy.get("[data-cy=emailInput").as("emailInput");
    cy.get("[data-cy=passwordInput").as("passwordInput");
    cy.get("[data-cy=confirmPasswordInput").as("confirmPasswordInput");

    cy.get("@emailInput").type("email@email.com");
    cy.get("@passwordInput").type("password");
    cy.get("@confirmPasswordInput").type("password");

    cy.get("@passwordInput")
      .invoke("val")
      .then((passwordValue) => {
        expect(passwordValue.trim()).to.not.be.empty;
        cy.get("@confirmPasswordInput").invoke("val").should("eq", passwordValue);
        cy.get("@signupButton").should("not.be.disabled");
      });
    // then - 회원가입에 성공한다.

    cy.intercept(
      {
        method: "POST",
        url: "/user/signup",
      },
      { token: "AUTH_TOKEN" }
    ).as("signup");
    cy.get("@signupButton").click();
    cy.url().should("include", "/login");
  });
});
