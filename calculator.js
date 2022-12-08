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
  marketVal,
  downPayment,
  yearlyIncome,
  interestRate,
  termYears,
  hoaYearly
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
  var equityValue = marketVal - totalLoanAmount;
  var buyersEquityPercentage = (equityValue / marketVal) * 100;
  var monthlyInsuredLoan = loanInsuranceCalculator(
    totalLoanAmount,
    buyersEquityPercentage
  );
  // HOA
  var yearlyHOAFees = hoaYearly;
  var monthlyHOAFees = yearlyHOAFees / 12;
  // Property Tax
  var propTaxRate = 0.0125;
  var yearlyPropTax = marketVal * propTaxRate;
  var monthlyPropTax = yearlyPropTax / 12;
  // Get yearlyInsurance
  var insuranceRate = 0.0075;
  var yearlyInsurance = marketVal * insuranceRate;
  var monthlyHomeOwnersInsurance = yearlyInsurance / 12;
  var loanPaymentAmount =
    totalLoanAmount *
    (interestRate / 12) *
    (Math.pow(1 + interestRate / 12, 12 * termYears) /
      (Math.pow(1 + interestRate / 12, 12 * termYears) - 1));
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
