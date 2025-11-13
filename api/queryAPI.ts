const getQueryKeys = {
  todo: {
    all: ["todo"],
    list: () => ["todo", "list"],
    detail: (id: string) => ["todo", "detail", id],
  },
}

export { getQueryKeys }
