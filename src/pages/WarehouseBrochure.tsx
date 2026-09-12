import BrochurePage from "./BrochurePage";

const WarehouseBrochure = () => (
  <BrochurePage
    slug="warehouse"
    backTo="/warehouse"
    pdfPath="/brochures/indexia-warehouse.pdf"
    pdfName="Indexia-Warehouse-Brochure.pdf"
    band="var(--color-navy)"
  />
);

export default WarehouseBrochure;
