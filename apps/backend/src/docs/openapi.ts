export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'AI Job Tracker API',
    version: '1.0.0',
    description: 'Secure REST API for user-authenticated job tracking',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      CookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
    schemas: {
      Job: {
        type: 'object',
        required: ['company', 'role', 'status'],
        properties: {
          id: { type: 'string' },
          company: { type: 'string' },
          role: { type: 'string' },
          status: { type: 'string' },
          link: { type: 'string', nullable: true },
          notes: { type: 'string', nullable: true },
          deadline: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
    },
  },
  security: [{ CookieAuth: [] }],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Sign up a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthRequest' },
            },
          },
        },
        responses: {
          201: { description: 'User created with JWT in cookie' },
          400: { description: 'Email already exists or validation failed' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthRequest' },
            },
          },
        },
        responses: {
          200: { description: 'JWT cookie set on success' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout user (clear token cookie)',
        responses: {
          200: { description: 'Logged out successfully' },
        },
      },
    },
    '/jobs': {
      get: {
        tags: ['Jobs'],
        summary: 'Get all jobs for the logged-in user',
        responses: {
          200: {
            description: 'List of jobs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Job' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        tags: ['Jobs'],
        summary: 'Create a new job',
        security: [{ CookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Job' },
            },
          },
        },
        responses: {
          201: { description: 'Job created' },
          403: { description: 'Missing or invalid CSRF token' },
        },
      },
    },
    '/jobs/{id}': {
      get: {
        tags: ['Jobs'],
        summary: 'Get one job',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Job found' },
          404: { description: 'Job not found' },
        },
      },
      put: {
        tags: ['Jobs'],
        summary: 'Update a job',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Job' },
            },
          },
        },
        responses: {
          200: { description: 'Job updated' },
          403: { description: 'CSRF token missing or invalid' },
        },
      },
      delete: {
        tags: ['Jobs'],
        summary: 'Delete a job',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          204: { description: 'Deleted' },
          403: { description: 'Unauthorized or invalid token' },
        },
      },
    },
    '/csrf-token': {
      get: {
        tags: ['Security'],
        summary: 'Get a CSRF token for cookie-authenticated requests',
        responses: {
          200: {
            description: 'Returns CSRF token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    csrfToken: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
