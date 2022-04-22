export default [
  {
    when: (row) => row.trangthai.ten == "chờ duyệt",
    style: {
      backgroundColor: "rgba(63, 195, 128, 0.15)",
    },
  },
  {
    when: (row) => row.trangthai.ten == "đã xử lý",
    style: {
      backgroundColor: "rgba(219, 153, 153, 0.15)",
    },
  },
];