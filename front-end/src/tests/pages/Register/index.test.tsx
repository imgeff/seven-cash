import React from "react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter, screen } from "../../utils/RTL";
import { describe, expect, it, vi } from "vitest";
import { Register } from "../../../pages/Register";
import { RegisterProviders } from "./providers";
import userRequests from "../../../services/requests/User";

vi.mock("../../../services/requests/User");

describe("Testa a página de Registro", () => {
	it("Todos os elementos estão em tela", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const logotipo = screen.getByAltText("Logotipo da NG.Cash");
		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");
		const submitBtn = screen.getByRole("button", { name: "Criar Conta" });
		const wrongLoginFeedback = screen.getByTestId("wrong-login-feedback");
		const loginBtn = screen.getByRole("button", { name: "Voltar Para a Página de Login" });

		expect(logotipo).toBeInTheDocument();
		expect(usernameInput).toBeInTheDocument();
		expect(wrongUsernameFeedback).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(togglePasswordDisplay).toBeInTheDocument();
		expect(wrongPasswordFeedback).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument();
		expect(wrongLoginFeedback).toBeInTheDocument();
		expect(loginBtn).toBeInTheDocument();
	});

	it("Ao renderizar a página, o botão de criar conta deve estar desabilitado", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const submitBtn = screen.getByRole("button", { name: "Criar Conta" });

		expect(submitBtn).toBeDisabled();
	});

	it("Ao digitar um nome de usuário inválido um feedback de validação deve aparecer", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");

		expect(wrongUsernameFeedback).toBeEmptyDOMElement();

		userEvent.type(usernameInput, "b");
		expect(wrongUsernameFeedback).not.toBeEmptyDOMElement();

	});

	it("Ao digitar uma senha inválida um feedback de validação deve aparecer", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const passwordInput = screen.getByLabelText("Digite sua senha");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");

		expect(wrongPasswordFeedback).toBeEmptyDOMElement();

		userEvent.type(passwordInput, "b");
		expect(wrongPasswordFeedback).not.toBeEmptyDOMElement();

	});

	it("Ao clicar no ícone de mostrar senha, o input deve exibir a senha", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const passwordInput: HTMLInputElement = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");

		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(togglePasswordDisplay);

		expect(passwordInput.type).toBe("text");

	});

	it("Ao clicar no ícone de esconder senha, o input não deve exibir a senha", () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const passwordInput: HTMLInputElement = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");

		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(togglePasswordDisplay);
		userEvent.click(togglePasswordDisplay);

		expect(passwordInput.type).toBe("password");

	});

	it(`Ao digitar dados válidos nenhum feedback de validação deve aparecer
		e o botão de criar conta deve estar habilitado`, () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");
		const submitBtn = screen.getByRole("button", { name: "Criar Conta" });

		userEvent.type(usernameInput, "JOD");
		userEvent.type(passwordInput, "JhonDoe123");

		expect(wrongUsernameFeedback).toBeEmptyDOMElement();
		expect(wrongPasswordFeedback).toBeEmptyDOMElement();
		expect(submitBtn).toBeEnabled();

	});

	it("Ao clicar no botão de voltar para o login, o usuário deve ser redirecionado para a página login", async () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const loginBtn = screen.getByRole("button", { name: "Voltar Para a Página de Login" });

		expect(window.location.pathname).toBe("/register");

		userEvent.click(loginBtn);

		expect(window.location.pathname).toBe("/login");

	});

	it(`Ao digitar dados válidos e clicar no botão de criar conta,
	 o usuário deve ser redirecionado para a página main`, async () => {
		renderWithRouter(<Register />, { route: "/register" }, RegisterProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const submitBtn = screen.getByRole("button", { name: "Criar Conta" });

		expect(window.location.pathname).toBe("/register");

		userEvent.type(usernameInput, "JOD");
		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(submitBtn);

		expect(userRequests.requestRegister).toHaveBeenCalled();

	});

});
