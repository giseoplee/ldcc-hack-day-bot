const moment = require('moment-timezone');
const dateRange = 30;

module.exports = {
  basic: {
    type: 'buttons',
    buttons: [
      '방문 신청하기',
      '방문 신청내역 조회하기'
    ]
  },
  applyForVisit: {
    message: {
      text: '안녕하세요. 롯데정보통신 방문자 예약 챗봇입니다.'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '방문 신청하기',
        '방문 신청내역 조회하기'
      ]
    }
  },
  personalInfoAgree: {
    message: {
      text: `방문자 등록을 하시려면 개인정보 수집 및 이용 동의가 필요합니다.\n\n1. 개인정보의 수집 및 이용 목적\n- 방문 수속 시 본인확인 처리\n- 방문 신청 상태 전달(SMS 전송) 및 이용자 식별\n\n2. 수집하려는 개인정보의 항목\n- 방문자명, 휴대폰번호\n\n3. 개인정보의 보유 및 이용 기간\n- 롯데센터를 방문한 시점으로부터 3개월간 보유\n\n4. 동의 거부권 및 동의 거부에 따른 불이익 내용\n- 개인정보 수집 및 이용에 관한 동의를 거부할 수 있으며, 이 경우 출입이 제한될 수 있습니다.\n\n위 개인정보 수집 및 이용약관, 방문회사 약관에 동의하십니까?`,
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '예',
        '아니요'
      ]
    }
  },
  isVisited: {
    message: {
      text: '기존 방문 내역이 있으신가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '기존 방문자',
        '신규 방문자'
      ]
    }
  },
  visitorName: {
    message: {
      text: '방문자명을 입력해주세요.',
    }
  },
  visitorCompany: {
    message: {
      text: '회사명을 입력해주세요.',
    }
  },
  visitorPhone: {
    message: {
      text: '휴대폰 번호를 입력해주세요.',
    }
  },
  visitorInfoCheck: function (data) {
    const { visitorName, visitorCompany, visitorPhone } = data;
    return {
      message: {
        text: `아래의 방문자 정보가 맞습니까?\n방문자명: [ ${visitorName} ]\n회사명: [ ${visitorCompany} ]\n휴대폰 번호 : [ ${visitorPhone} ]`
        // photo: {
        //   'url': 'http://ec2-52-79-83-252.ap-northeast-2.compute.amazonaws.com:8080/astrology.jpg',
        //   'width': 640,
        //   'height': 480
        // }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '예',
          '아니요. 수정이 필요합니다.'
        ]
      }
    }
  },
  visitDate: (function () {
    const dateArr = [...Array(dateRange)];
    for (let i in dateArr) {
      dateArr[i] = moment().add('days', i).locale('ko').tz('Asia/Seoul').format(`MM월 DD일 dddd`);
    };
    return {
      message: {
        text: '방문하실 날짜를 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: dateArr
      }
    };
  })(),
  visitTime: {
    message: {
      text: '방문하실 시간을 선택해주세요.'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00'
      ]
    }
  },
  visitCompany: {
    message: {
      text: '방문하실 회사가 어디신가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '롯데정보통신',
        '현대정보기술',
        '웨이즈시스템즈',
        '이온아이티',
        '롯데피에스넷',
        '코디스페이스',
        'UBIT 센터'
      ]
    }
  },
  visitPlace: {
    message: {
      text: '방문하실 장소는 어디신가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '롯데센터 (신관 오피스)',
        '데이터센터',
        '통합콜센터 (구관)'
      ]
    }
  },
  visitPurpose: {
    message: {
      text: '방문의 사유는 어떻게 되시나요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '업무협의',
        '제안작업',
        '내부공사',
        '시스템 구축',
        '교육',
        '기타'
      ]
    }
  },
  visitManager: {
    message: {
      text: '방문을 담당해주시는 담당자명을 입력해주세요.'
    }
  },
  visitManagerCheck: function (data){
    const { visitManager } = data;
    const buttonArr = ((name) => {
      return Math.random() >= 0.5
      ? [`솔루션연구팀 솔루션연구담당 ${name}`, `DT지원팀 DT 기술담당 ${name}`]
      : [`솔루션연구팀 솔루션연구담당 ${name}`]
    })(visitManager);

    return {
      message: {
        text: `담당자를 선택해주세요.`
      },
      keyboard: {
        type: 'buttons',
        buttons: buttonArr
      }
    }
  },
  visitCar: {
    message: {
      text: '방문 차량이 있으신가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '예',
        '아니요'
      ]
    }
  },
  visitCarNumber: {
    message: {
      text: '차량 번호를 입력해주세요.'
    }
  },
  isStuff: {
    message: {
      text: '반입할 물품이 있으신가요?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '아니요',
        '핸드폰',
        '노트북'
      ]
    }
  },
  applyForVisitConfirm: function (data) {
    const { visitDate, visitCompany, visitPlace, visitManager, visitPurpose, visitorName, visitorCompany, visitorPhone, isStuff, visitCar, visitCarNumber } = data;
    return {
      message: {
        text: `방문일자: [ ${visitDate}} ]\n방문회사 : [ ${visitCompany} ]\n방문장소 : [ ${visitPlace} ]\n담당자명 : [ ${visitManager} ]\n방문목적 : [ ${visitPurpose} ]\n방문자명: [ ${visitorName} ]\n회사명 : [ ${visitorCompany} ]\n휴대폰번호 : [ ${visitorPhone} ]\n차량반입여부 : [ ${visitCar === '아니요' ? 'X' : 'O / '+visitCarNumber} ]\n반입물품 : [ ${isStuff === '아니요' ? 'X' : isStuff} ]\n\n위와 같이 방문신청을 하시겠습니까?`,
        // photo: {
        //   'url': 'http://ec2-52-79-83-252.ap-northeast-2.compute.amazonaws.com:8080/cookie.jpg',
        //   'width': 640,
        //   'height': 480
        // }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '예',
          '아니요',
        ]
      }
    }
  },
  applyForVisitCheck: function (data) {
    const { visitDate, visitCompany, visitPlace, visitManager, visitPurpose, visitorName, visitorCompany, visitorPhone, isStuff, visitCar, visitCarNumber } = data;
    return {
      message: {
        text: `방문신청 내역은 아래와 같습니다.\n방문일자: [ ${visitDate} ]\n방문회사 : [ ${visitCompany} ]\n방문장소 : [ ${visitPlace} ]\n담당자명 : [ ${visitManager} ]\n방문목적 : [ ${visitPurpose} ]\n방문자명: [ ${visitorName} ]\n회사명 : [ ${visitorCompany} ]\n휴대폰번호 : [ ${visitorPhone} ]\n차량반입여부 : [ ${visitCar === '아니요' ? 'X' : 'O / '+visitCarNumber} ]\n반입물품 : [ ${isStuff === '아니요' ? 'X' : isStuff} ]\n\n 방문자 휴대폰 보안 프로그램 다운로드\nhttp://mdm.ldcc.co.kr/mdm_admin_server/download`,
        photo: {
          'url': 'http://ec2-52-79-83-252.ap-northeast-2.compute.amazonaws.com:8080/lottecenter_map.JPG',
          'width': 640,
          'height': 480
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: [
          '처음으로'
        ]
      }
    }
  }
}
