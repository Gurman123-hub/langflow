import { expect, test } from "@playwright/test";

test("IntComponent", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector('[data-testid="mainpage_title"]', {
    timeout: 30000,
  });

  await page.waitForSelector('[id="new-project-btn"]', {
    timeout: 30000,
  });

  let modalCount = 0;
  try {
    const modalTitleElement = await page?.getByTestId("modal-title");
    if (modalTitleElement) {
      modalCount = await modalTitleElement.count();
    }
  } catch (error) {
    modalCount = 0;
  }

  while (modalCount === 0) {
    await page.getByText("New Project", { exact: true }).click();
    await page.waitForTimeout(3000);
    modalCount = await page.getByTestId("modal-title")?.count();
  }
  await page.waitForSelector('[data-testid="blank-flow"]', {
    timeout: 30000,
  });
  await page.getByTestId("blank-flow").click();
  await page.getByTestId("sidebar-search-input").click();
  await page.getByTestId("sidebar-search-input").fill("openai");

  await page.waitForTimeout(1000);

  await page
    .getByTestId("modelsOpenAI")
    .first()
    .dragTo(page.locator('//*[@id="react-flow-id"]'));
  await page.mouse.up();
  await page.mouse.down();
  await page.waitForSelector('[title="fit view"]', {
    timeout: 100000,
  });

  await page.getByTitle("fit view").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();

  await page.getByTestId("more-options-modal").click();
  await page.getByTestId("edit-button-modal").click();
  await page.getByTestId("showmax_tokens").click();

  await page.getByText("Close").last().click();
  await page.getByTestId("int_int_max_tokens").click();
  await page.getByTestId("int_int_max_tokens").fill("1020304050");

  let value = await page.getByTestId("int_int_max_tokens").inputValue();

  if (value != "1020304050") {
    expect(false).toBeTruthy();
  }

  await page.getByTestId("int_int_max_tokens").click();
  await page.getByTestId("int_int_max_tokens").fill("0");

  value = await page.getByTestId("int_int_max_tokens").inputValue();

  if (value != "0") {
    expect(false).toBeTruthy();
  }

  await page.getByTestId("title-OpenAI").click();

  await page.waitForSelector('[title="fit view"]', {
    timeout: 100000,
  });

  await page.getByTitle("fit view").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();

  await page.getByTestId("more-options-modal").click();
  await page.getByTestId("edit-button-modal").click();

  value = await page.getByTestId("int_int_edit_max_tokens").inputValue();

  if (value != "0") {
    expect(false).toBeTruthy();
  }

  await page.getByTestId("int_int_edit_max_tokens").click();
  await page.getByTestId("int_int_edit_max_tokens").fill("60708090");

  await page.locator('//*[@id="showmodel_kwargs"]').click();
  expect(
    await page.locator('//*[@id="showmodel_kwargs"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showmodel_name"]').click();
  expect(
    await page.locator('//*[@id="showmodel_name"]').isChecked(),
  ).toBeFalsy();

  await page.locator('//*[@id="showopenai_api_base"]').click();
  expect(
    await page.locator('//*[@id="showopenai_api_base"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showtemperature"]').click();
  expect(
    await page.locator('//*[@id="showtemperature"]').isChecked(),
  ).toBeFalsy();

  await page.locator('//*[@id="showmodel_kwargs"]').click();
  expect(
    await page.locator('//*[@id="showmodel_kwargs"]').isChecked(),
  ).toBeFalsy();

  await page.locator('//*[@id="showmodel_name"]').click();
  expect(
    await page.locator('//*[@id="showmodel_name"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showopenai_api_base"]').click();
  expect(
    await page.locator('//*[@id="showopenai_api_base"]').isChecked(),
  ).toBeFalsy();

  await page.locator('//*[@id="showtemperature"]').click();
  expect(
    await page.locator('//*[@id="showtemperature"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showmodel_kwargs"]').click();
  expect(
    await page.locator('//*[@id="showmodel_kwargs"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showmodel_name"]').click();
  expect(
    await page.locator('//*[@id="showmodel_name"]').isChecked(),
  ).toBeFalsy();

  await page.locator('//*[@id="showopenai_api_base"]').click();
  expect(
    await page.locator('//*[@id="showopenai_api_base"]').isChecked(),
  ).toBeTruthy();

  await page.locator('//*[@id="showtemperature"]').click();
  expect(
    await page.locator('//*[@id="showtemperature"]').isChecked(),
  ).toBeFalsy();

  await page.getByText("Close").last().click();

  const plusButtonLocator = page.getByTestId("int-input-max_tokens");
  const elementCount = await plusButtonLocator?.count();
  if (elementCount === 0) {
    expect(true).toBeTruthy();

    await page.getByTestId("more-options-modal").click();
    await page.getByTestId("edit-button-modal").click();

    const valueEditNode = await page
      .getByTestId("int_int_max_tokens")
      .inputValue();

    if (valueEditNode != "128000") {
      expect(false).toBeTruthy();
    }

    await page.getByText("Close").last().click();
    await page.getByTestId("int_int_max_tokens").click();
    await page.getByTestId("int_int_max_tokens").fill("3");

    let value = await page.getByTestId("int_int_max_tokens").inputValue();

    if (value != "3") {
      expect(false).toBeTruthy();
    }

    await page.getByTestId("int_int_max_tokens").click();
    await page.getByTestId("int_int_max_tokens").fill("-3");
    await page.getByTestId("div-generic-node").click();

    value = await page.getByTestId("int_int_max_tokens").inputValue();

    if (value != "0") {
      expect(false).toBeTruthy();
    }
  }
});
