import { useState, useEffect } from "react";
import axios from "axios";
import * as serviceWorker from "../serviceWorkerRegistration";

const pushNotificationSupported = serviceWorker.isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setSuserConsent] = useState(Notification.permission);
  const [userSubscription, setUserSubscription] = useState(null);
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      serviceWorker.register();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExistingSubscription = async () => {
      const existingSubscription = await serviceWorker.getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoading(false);
    };
    getExistingSubscription();
  }, []);

  const onClickAskUserPermission = async () => {
    setLoading(true);
    setError(false);
    const consent = await serviceWorker.askUserPermission();
    // .then((consent) => {
    // });
    setSuserConsent(consent);
    if (consent !== "granted") {
      setError({
        name: "Consent denied",
        message: "You denied the consent to receive notifications",
        code: 0,
      });
    }
    setLoading(false);
  };

  const onClickSusbribeToPushNotification = async () => {
    setLoading(true);
    setError(false);
    // const subscription = await serviceWorker.createNotificationSubscription();
    serviceWorker
      .createNotificationSubscription()
      .then(function (subscrition) {
        // setUserSubscription(subscrition);
        setUserSubscription(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Couldn't create the notification subscription",
          err,
          "name:",
          err.name,
          "message:",
          err.message,
          "code:",
          err.code
        );
        setError(err);
        setLoading(false);
      });
  };

  const onClickSendSubscriptionToPushServer = () => {
    setLoading(true);
    setError(false);
    axios
      //   .post("http://localhost:4000/subscription", { data: userSubscription }) Đổi lại api endpoint
      .then(function (response) {
        setPushServerSubscriptionId(response.data.id);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const onClickSendNotification = async () => {
    // click để mô phỏng serer gửi noti cho mình // sau này bỏ cũng được
    setLoading(true);
    setError(false);
    axios
      //   .get(`http://localhost:4000/subscription/${pushServerSubscriptionId}`) Đổi lại api endpoint
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    setLoading(false);
  };

  return {
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
  };
}
