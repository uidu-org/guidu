export function isCustomSku(sku) {
  return sku.price === 100;
}

export function isCustomPlan(plan) {
  return plan.amount === 100;
}
