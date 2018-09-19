const { setValue } = require('../modules/redis');
const message = require('./message');

module.exports = function (key, content, context) {

  const defaultContext = {
    index: 'applyForVisit',
    visitDate: null,
    visitCompany: null,
    visitPlace: null,
    visitManager: null,
    visitPurpose: null,
    visitorName: null,
    visitorCompany: null,
    visitorPhone: null,
    visitorStuff: null,
    visitorCar: null,
  };

  function contextCheck (context) {
    return context === null ? defaultContext : setContextBranch(context, content);
  };

  function setContext (context, msg) {
    if (context.index === 'visitTime') {
      context['visitDate'] = `${context.visitDate} ${msg}`;
    } else {
      context[context.index] = msg;
    }
    return context;
  }

  function setContextBranch (context, msg) {
    return go(context,
      match
      .case({index: 'visitorName'})(c => setContext(c, msg))
      .case({index: 'visitorCompany'})(c => setContext(c, msg))
      .case({index: 'visitorPhone'})(c => setContext(c, msg))
      .case({index: 'visitDate'})(c => setContext(c, msg))
      .case({index: 'visitTime'})(c => setContext(c, msg))
      .case({index: 'visitCompany'})(c => setContext(c, msg))
      .case({index: 'visitPlace'})(c => setContext(c, msg))
      .case({index: 'visitPurpose'})(c => setContext(c, msg))
      .case({index: 'visitManager'})(c => setContext(c, msg))
      .case({index: 'visitCar'})(c => setContext(c, msg))
      .case({index: 'visitCarNumber'})(c => setContext(c, msg))
      .case({index: 'isStuff'})(c => setContext(c, msg))
      .else(c => c)
    );
  };

  function nextBranch (context, msg) {
    return go(context,
      match
      .case({index: 'applyForVisit'})(_ => applyForVisitBranch(c, msg))
      .case({index: 'personalInfoAgree'})(_ => personalInfoAgreeBranch(c, msg))
      .case({index: 'isVisited'})(_ => isVisitedBranch(c, msg))
      .case({index: 'visitorName'})(_ => 'visitorCompany')
      .case({index: 'visitorCompany'})(_ => 'visitorPhone')
      .case({index: 'visitorPhone'})(_ => 'visitorInfoCheck')
      .case({index: 'visitorInfoCheck'})(c => visitorInfoCheckBranch(c, msg))
      .case({index: 'visitDate'})(_ => 'visitTime')
      .case({index: 'visitTime'})(_ => 'visitCompany')
      .case({index: 'visitCompany'})(_ => 'visitPlace')
      .case({index: 'visitPlace'})(_ => 'visitPurpose')
      .case({index: 'visitPurpose'})(_ => 'visitManager')
      .case({index: 'visitManager'})(_ => 'visitManagerCheck')
      .case({index: 'visitManagerCheck'})(_ => 'visitCar')
      .case({index: 'visitCar'})(c => visitCarBranch(c, msg))
      .case({index: 'isStuff'})(_ => 'applyForVisitConfirm')
      .case({index: 'applyForVisitConfirm'})(c => applyForVisitConfirmBranch(c, msg))
      .case({index: 'applyForVisitCheck'})(c => 'applyForVisit')
      .else(_ => 'applyForVisit')
    )
  };

  function applyForVisitConfirmBranch (context, msg) {
    return msg === '예' ? 'applyForVisitCheck' : 'applyForVisit'
  }

  function visitCarBranch (context, msg) {
    return msg === '예' ? 'visitCarNumber' : 'isStuff';
  }

  function visitorInfoCheckBranch (context, msg) {
    return msg === '예' ? 'visitDate' : 'visitorName';
  }

  function isVisitedBranch (context, msg) {
    return msg === '기존 방문자' ? 'visitorInfoCheck' : 'visitorName';
  }

  function personalInfoAgreeBranch (context, msg) {
    return msg === '예' ? 'isVisited' : 'applyForVisit';
  }

  function applyForVisitBranch (context, msg) {
    switch (msg) {
      case '방문 신청하기': return 'personalInfoAgree'; break;
      case '방문 신청내역 조회하기': return 'applyForVisitCheck'; break;
    }
  };

  function updateRedis (context, index) {
    // let contextToBeUpdate = newReservationCheck(context, context.index, content);
    contextToBeUpdate.index = index;
    return setValue(key, contextToBeUpdate).then(_ => contextToBeUpdate);
  };

  function messageFunction (context, index) {
    switch (index) {
      case 'applyForVisitCheck' : return message.applyForVisitCheck(context);
      case 'applyForVisitConfirm' : return message.applyForVisitConfirm(context);
      case 'visitManagerCheck' : return message.visitManagerCheck(context);
      case 'visitorInfoCheck' : return message.visitorInfoCheck(context);
    }
  }

  function nextMessage (context) {
    const { index } = context;
    return ['applyForVisitCheck', 'applyForVisitConfirm', 'visitManagerCheck', 'visitorInfoCheck']
          .includes(index) ? messageFunction(context, index) : message[index];
  };

  return go(
    context,
    contextCheck,
    c => updateRedis(c, nextBranch(c, content)),
    nextMessage
  );
};
