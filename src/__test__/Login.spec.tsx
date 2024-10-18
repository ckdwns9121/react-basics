import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import useLogin from "../hooks/useLogin";

const queryClient = new QueryClient({ defaultOptions: {} });

describe("로그인 테스트", () => {
  test("로그인에 실패하면 에러메시지가 나타난다", async () => {
    //given - 로그인화면이 그려짐
    const routes = [
      {
        path: "/login",
        elemant: <LoginPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // when - 사용자가 로그인에 실패한다
    // const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    // const loginButton = screen.getByRole("button", { name: "로그인" });
    // fireEvent.click(loginButton);

    // const { result } = renderHook(() => useLogin(), { wrapper });

    // // then - 에러메시지가 나타님
    // await waitFor(() => result.current.isError);

    // const errorMessage = await screen.findByTestId("error-message");
    // expect(errorMessage).toBeInTheDocument();
  });
});
