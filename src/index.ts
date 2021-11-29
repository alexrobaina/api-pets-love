import app from './app';
import './database/config';
import './config/config';

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
