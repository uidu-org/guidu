export function isCustomSku(sku) {
  return sku.price === 1;
}

export function isCustomPlan(plan) {
  return plan.amount === 1;
}
