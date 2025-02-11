import { UsedMaterial } from '../schemas/used-material.schema';

export const calculatePrice = (usedMaterials: UsedMaterial[]) => {
  return usedMaterials.reduce((total, usedMaterial) => {
    return (
      total +
      parseFloat(usedMaterial.materialId.pricePerUnit.toString()) *
        parseFloat(usedMaterial.quantity.toString())
    );
  }, 0);
};
