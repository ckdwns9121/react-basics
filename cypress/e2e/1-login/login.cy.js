describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 화면이 그려진다.
    cy.visit("/login"); // 로그인 페이지 방문
    cy.get("[data-cy=emailInput]").as("emailInput");
    cy.get("[data-cy=passwordInput]").as("passwordInput");
    // when - 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다.
    // then - 로그인에 성공하고 메인화면으로 이동한다.

    cy.get("@emailInput").type("test@email.com");
    cy.get("@passwordInput").type("1234");

    cy.get("@emailInput").invoke("val").should("eq", "test@email.com");
    cy.get("@passwordInput").invoke("val").should("eq", "1234");

    cy.intercept(
      {
        method: "POST",
        url: "/user/login",
      },
      {
        token: "AUTH_TOKEN",
      }
    ).as("login");

    cy.get("[data-cy=loginButton]").should("exist").click();

    cy.url().should("include", "http://localhost:5173");
  });
});
