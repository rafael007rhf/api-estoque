export default function errorMiddleware(err, _req, res, _next) {
  let status = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor.';

  if (err.name === 'ValidationError' || err.name === 'CastError') status = 400;
  if (err.code === 11000) { status = 400; message = 'Registro duplicado.'; }
  if (status === 500) { console.error('[ERROR]', err); message = 'Erro interno do servidor.'; }

  res.status(status).json({ error: message });
}
