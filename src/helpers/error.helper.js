'use strict';

class AppError {
  constructor(error, statuscode) {
    this.error = error;
    this.name = error.name;
    if (error.errors) {
      this.errors = error.errors;
    }
    this.status = 'fail';
    this.statuscode = statuscode || 500;
    this.init();
  }

  init() {
    const types = {
      SequelizeValidationError: this.handleValidationError,
      SequelizeUniqueConstraintError: this.handleUniqueConstraintError,
      SequelizeForeignKeyConstraintError: this.handleForeignKeyConstraintError,
    };

    const handler = types[this.name] ?? this.unknownError;
    return handler.call(this);
  }

  // SequelizeValidationError
  handleValidationError() {
    const { errors } = this;
    const messages = [];
    for (const { message } of errors) {
      messages.push(message);
    }
    this.statuscode = 400;

    return {
      message: {
        status: 'fail',
        type: 'ValidationError',
        message: messages.join(', '),
      },
      code: this.statuscode,
    };
  }

  // SequelizeUniqueConstraintError
  handleUniqueConstraintError() {
    const { errors } = this;
    const messages = [];
    for (const { message } of errors) {
      messages.push(message);
    }
    this.statuscode = 400;

    return {
      message: {
        status: 'fail',
        type: 'UniqueConstraintError',
        message: messages.join(', '),
      },
      code: this.statuscode,
    };
  }

  // SequelizeForeignKeyConstraintError
  handleForeignKeyConstraintError() {
    const { constraint } = this.error.parent;
    const leftUnderscore = constraint.indexOf('_') + 1;
    const rightUnderscore = constraint.lastIndexOf('_');
    const key = constraint.slice(leftUnderscore, rightUnderscore - 2);
    this.statuscode = 409;

    return {
      message: {
        status: 'fail',
        type: 'ForeignKeyConstraintError',
        message: `There is no such ${key}`,
      },
      code: this.statuscode,
    };
  }

  unknownError() {
    return {
      message: {
        status: 'error',
        type: 'UnknownError',
        message: 'Server unknown error occured',
        error: this.error,
      },
      code: this.statuscode,
    };
  }
}

module.exports = (args) => new AppError(args).init();
