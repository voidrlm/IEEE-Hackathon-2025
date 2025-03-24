// Rest API EndPoints
export const restAPIEndPoints = {
  chatbot: {
    url: '/ask?question="{question}',
    method: "GET",
  },

  contentMonitoring: {
    url: "/check?content={content}",
    method: "GET",
  },

  resumeAnalyse: {
    url: "/resume?content={content}",
    method: "GET",
  },
};
