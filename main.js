const yearlyIncome = document.getElementById('yearly-income');
const loanAmount = document.getElementById('loan-amount');
const interestRate = document.getElementById('interest-rate');
const purchasePrice = document.getElementById('purchase-price');
const marketValue = document.getElementById('market-value');
const downPayment = document.getElementById('down-payment');
const loanTerm = document.getElementById('loan-term');
const modal = document.getElementById('modal');
const monthlyPayment = document.getElementById('monthly-payment');
const totalInterest = document.getElementById('total-interest');
const totalPayment = document.getElementById('total-payment');
const hoaFeeContainer = document.getElementById('hoa-fee-container');
const hoaSelector = document.getElementById('hoa-selector');
const hoaYesNo = document.getElementById('hoa-yes-no');
const hoaFee = document.getElementById('hoa-fee');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
function calculate() {
  if (
    yearlyIncome.value === '' ||
    loanAmount.value === '' ||
    interestRate.value === '' ||
    purchasePrice.value === '' ||
    marketValue.value === '' ||
    downPayment.value === '' ||
    loanTerm.value === ''
  ) {
    alert('Please fill out all the fields');
    return;
  }
  modal.style.display = 'block';
  monthlyPayment.innerHTML = `<br>Monthly income is ${formatter.format(
    yearlyIncome.value / 12
  )}
  <br>Total monthly payment will be: ${formatter.format(
    calculatePayment(
      purchasePrice.value,
      marketValue.value,
      downPayment.value,
      yearlyIncome.value,
      interestRate.value,
      loanTerm.value,
      hoaFee.value
    ).totalMonthlyPayment
  )}
  <br>We recommend that this loan amount should not exceed 10% of your monthly income<br>`;
  if (calculateEquityPercentage(marketValue.value, purchasePrice.value) >= 10) {
    monthlyPayment.innerHTML += `<br>Based on your equity, you do not qualify for a loan<br>`;
  }
  if (calculateEquityPercentage(marketValue.value, purchasePrice.value) < 10) {
    monthlyPayment.innerHTML += `<br>Based on your equity, you qualify for a loan with insurance payments of ${
      ((initialLoanAmount + originationFeeAmount + CLOSING_COSTS) * 0.01) / 12
    }<br>`;
  }
}

function closeModal() {
  modal.style.display = 'none';
}

function showHoaFeeBox() {
  hoaSelector.value = hoaSelector.value === 'yes' ? 'no' : 'yes';
  hoaYesNo.innerHTML = hoaSelector.value === 'yes' ? 'Yes' : 'No';
  hoaSelector.checked = hoaSelector.checked === true ? false : true;
  if (hoaSelector.value === 'yes') {
    hoaFeeContainer.classList.remove('hidden');
  } else {
    hoaFeeContainer.classList.add('hidden');
  }
  if (hoaSelector.checked === true) {
    console.log(hoaSelector.checked);
  } else {
    console.log(hoaSelector.checked);
  }
}

function loanInsuranceCalculator(totalLoanAmount, buyersEquityPercentage) {
  if (buyersEquityPercentage >= 10) {
    return 0;
  } else {
    // This is additional monthly payment incurred for having loan insurance
    return (0.01 * totalLoanAmount) / 12;
  }
}
function calculatePayment(
  purchasePrice,
  marketValue,
  downPayment,
  yearlyIncome,
  interestRate,
  loanTerm,
  hoaFee
) {
  var output = JSON.parse('{"initialLoanAmount":0}');
  var initialLoanAmount = purchasePrice - downPayment;
  output.initialLoanAmount = initialLoanAmount;
  const ORIGINATION_FEE = 0.01;
  var originationFeeAmount = initialLoanAmount * ORIGINATION_FEE;
  output.originationFeeAmount = originationFeeAmount;
  const CLOSING_COSTS = 2500;
  var totalLoanAmount =
    initialLoanAmount + originationFeeAmount + CLOSING_COSTS;
  var equityValue = marketValue - totalLoanAmount;
  var buyersEquityPercentage = calculateEquityPercentage(
    equityValue,
    marketValue
  );
  var monthlyInsuredLoan = loanInsuranceCalculator(
    totalLoanAmount,
    buyersEquityPercentage
  );
  // HOA
  var yearlyHOAFees = hoaFee;
  var monthlyHOAFees = yearlyHOAFees / 12;
  // Property Tax
  var propTaxRate = 0.0125;
  var yearlyPropTax = marketValue * propTaxRate;
  var monthlyPropTax = yearlyPropTax / 12;
  // Get yearlyInsurance
  var insuranceRate = 0.0075;
  var yearlyInsurance = marketValue * insuranceRate;
  var monthlyHomeOwnersInsurance = yearlyInsurance / 12;
  var loanPaymentAmount =
    totalLoanAmount *
    (interestRate / 12) *
    (Math.pow(1 + interestRate / 12, 12 * loanTerm) /
      (Math.pow(1 + interestRate / 12, 12 * loanTerm) - 1));
  var totalMonthlyPayment =
    loanPaymentAmount +
    monthlyHomeOwnersInsurance +
    monthlyHOAFees +
    monthlyPropTax +
    monthlyInsuredLoan;
  output.totalMonthlyPayment = totalMonthlyPayment.toFixed(2);
  console.log(output);
  return output;
}
function calculateEquityPercentage(equityValue, marketValue) {
  return (equityValue / marketValue) * 100;
}
