export default (apiEngine) => ({
  form: (formName) => ({
    field: (fieldName, value) => ({
      validate: () => apiEngine.post(
        `/api/forms/${formName}/fields/${fieldName}/validation`, {
          data: { value },
        }
      ),
    }),
  }),
});
