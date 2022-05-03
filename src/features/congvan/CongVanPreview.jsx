function CongVanPreview({ link }) {
  console.log(link);
  return (
    <object data={link} type="application/pdf" className="w-100 h-100">
      <embed src={link} type="application/pdf" />
    </object>
  );
}

export default CongVanPreview;
