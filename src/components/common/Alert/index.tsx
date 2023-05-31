import { useState, useEffect } from 'react';
import { FaCheckCircle, FcInfo, IoMdWarning, VscError } from '@/components/common/Icons';
import { Event, parseHtml } from '@/utils';
import useTimer from '@/hooks/useTimer';
import type { AlertEventPayload } from '../../../../@types/global';

const iconMap = {
  error: VscError,
  warning: IoMdWarning,
  info: FcInfo,
  success: FaCheckCircle,
} as const;

const alertClassMap = {
  error: 'alert-error',
  success: 'alert-success',
  info: 'alert-info',
  warning: 'alert-warning',
} as const;

function Alert() {
  const [alert, setAlert] = useState<AlertEventPayload & { visible: boolean }>();

  const showAlert = (e: CustomEvent<AlertEventPayload>) => {
    setAlert({ ...e.detail, visible: true });
  };

  const hideAlert = () => {
    setAlert(undefined);
  };

  useTimer(hideAlert, alert?.duration || 3000, [alert?.visible]);
  useEffect(() => Event.on('alert', showAlert), []);

  if (!alert?.visible) return <></>;
  if (!alert?.message || !alert?.type) return <></>;

  const alertClass = alertClassMap[alert.type];
  const Icon = iconMap[alert.type];

  return (
    <div
      className={`alert fixed right-8 top-28 z-50 w-fit text-white shadow-lg max-lg:bottom-0 max-lg:right-auto max-lg:top-auto max-lg:w-full max-lg:rounded-none ${alertClass}`}
    >
      <div>
        <Icon className='text-2xl' />

        <div>
          <h5>{parseHtml(alert.message)}</h5>
          {alert.body && <p>{parseHtml(alert.body)}</p>}
        </div>
      </div>
    </div>
  );
}

export default Alert;
