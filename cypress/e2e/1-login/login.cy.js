describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 화면이 그려진다.
    cy.visit("/login");
    cy.get("[data-cy=emailInput]").as("emailInput");
    cy.get("[data-cy=passwordInput]").as("passwordInput");
    // when - 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다.
    // then - 로그인에 성공하고 메인화면으로 이동한다.
  });
});
