const useDatabase = () => {
  {
    return {
      getTerms: async () => [],
      getTerm: async () => null,
      addTerm: async () => ({ success: false, id: null, error: "Server-side rendering" }),
      updateTerm: async () => ({ success: false, error: "Server-side rendering" }),
      deleteTerm: async () => ({ success: false, error: "Server-side rendering" }),
      getAttendanceRecords: async () => [],
      updateAttendanceStatus: async () => ({ success: false, error: "Server-side rendering" }),
      bulkUpdateAttendance: async () => ({ success: false, updatedCount: 0, error: "Server-side rendering" }),
      getTermStatistics: () => [],
      generateTermCalendar: () => [],
      checkAndUpdateTermReadOnlyStatus: async () => ({})
    };
  }
};

export { useDatabase as u };
//# sourceMappingURL=useDatabase.mjs.map
