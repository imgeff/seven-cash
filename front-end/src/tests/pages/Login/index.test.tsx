import React from "react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter, screen } from "../../utils/RTL";
import { describe, expect, it, vi } from "vitest";
import { Login } from "../../../pages/Login";
import { LoginProviders } from "./providers";
import userRequests from "../../../services/requests/User";

vi.mock("../../../services/requests/User");

describe("Testa a página de Login", () => {
	it("Todos os elementos estão em tela", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const logotipo = screen.getByAltText("Logotipo da NG.Cash");
		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");
		const submitBtn = screen.getByRole("button", { name: "Entrar na Plataforma" });
		const wrongLoginFeedback = screen.getByTestId("wrong-login-feedback");
		const registerBtn = screen.getByRole("button", { name: "Ainda não tem conta? Crie aqui :)" });

		expect(logotipo).toBeInTheDocument();
		expect(usernameInput).toBeInTheDocument();
		expect(wrongUsernameFeedback).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(togglePasswordDisplay).toBeInTheDocument();
		expect(wrongPasswordFeedback).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument();
		expect(wrongLoginFeedback).toBeInTheDocument();
		expect(registerBtn).toBeInTheDocument();
	});

	it("Ao renderWithRouterizar a página o botão de login deve estar desabilitado", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const submitBtn = screen.getByRole("button", { name: "Entrar na Plataforma" });

		expect(submitBtn).toBeDisabled();
	});

	it("Ao digitar um nome de usuário inválido um feedback de validação deve aparecer", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");

		expect(wrongUsernameFeedback).toBeEmptyDOMElement();

		userEvent.type(usernameInput, "b");
		expect(wrongUsernameFeedback).not.toBeEmptyDOMElement();

	});

	it("Ao digitar uma senha inválida um feedback de validação deve aparecer", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const passwordInput = screen.getByLabelText("Digite sua senha");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");

		expect(wrongPasswordFeedback).toBeEmptyDOMElement();

		userEvent.type(passwordInput, "b");
		expect(wrongPasswordFeedback).not.toBeEmptyDOMElement();

	});

	it("Ao clicar no ícone de mostrar senha, o input deve exibir a senha", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const passwordInput: HTMLInputElement = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");

		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(togglePasswordDisplay);

		expect(passwordInput.type).toBe("text");

	});

	it("Ao clicar no ícone de esconder senha, o input não deve exibir a senha", () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const passwordInput: HTMLInputElement = screen.getByLabelText("Digite sua senha");
		const togglePasswordDisplay = screen.getByTestId("toggle-password-display");

		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(togglePasswordDisplay);
		userEvent.click(togglePasswordDisplay);

		expect(passwordInput.type).toBe("password");

	});

	it(`Ao digitar dados válidos nenhum feedback de validação deve aparecer
		e o botão de login deve estar habilitado`, () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const wrongUsernameFeedback = screen.getByTestId("wrong-username-feedback");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const wrongPasswordFeedback = screen.getByTestId("wrong-password-feedback");
		const submitBtn = screen.getByRole("button", { name: "Entrar na Plataforma" });

		userEvent.type(usernameInput, "JOD");
		userEvent.type(passwordInput, "JhonDoe123");

		expect(wrongUsernameFeedback).toBeEmptyDOMElement();
		expect(wrongPasswordFeedback).toBeEmptyDOMElement();
		expect(submitBtn).toBeEnabled();

	});

	it("Ao clicar no botão de criar conta, o usuário deve ser redirecionado para a página main", async () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const registerBtn = screen.getByRole("button", { name: "Ainda não tem conta? Crie aqui :)" });

		expect(window.location.pathname).toBe("/login");

		userEvent.click(registerBtn);

		expect(window.location.pathname).toBe("/register");

	});

	it(`Ao digitar dados válidos e clicar no botão de login,
	 o usuário deve ser redirecionado para a página main`, async () => {
		renderWithRouter(<Login />, { route: "/login" }, LoginProviders);

		const usernameInput = screen.getByLabelText("Digite seu nome de usuário");
		const passwordInput = screen.getByLabelText("Digite sua senha");
		const submitBtn = screen.getByRole("button", { name: "Entrar na Plataforma" });

		expect(window.location.pathname).toBe("/login");

		userEvent.type(usernameInput, "JOD");
		userEvent.type(passwordInput, "JhonDoe123");
		userEvent.click(submitBtn);

		expect(userRequests.requestLogin).toHaveBeenCalled();

	});

});
