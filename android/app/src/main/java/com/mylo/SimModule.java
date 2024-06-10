package com.mylo;

import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.content.Context;

import java.util.List;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import javax.annotation.Nullable;

public class SimModule extends ReactContextBaseJavaModule {

    private Context context;

    public SimModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "SimModule";
    }

    @ReactMethod
    public void getSimInfo(Promise promise) {
        loadSim(-1, promise);
    }

    @ReactMethod
    public void loadSim(int limit, Promise promise) {
        loadSimWithFilter(limit, null, promise);
    }

    // You can directly call this method with the respective arguments. As you don't require any limit.
    @ReactMethod
    public void loadSimWithFilter(int limit, @Nullable ReadableMap filter, Promise promise) {
        try {
            WritableArray result = Arguments.createArray();

            SubscriptionManager simManager = (SubscriptionManager) context.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE);

            int activeSubscriptionInfoCount = simManager.getActiveSubscriptionInfoCount();
            int activeSubscriptionInfoCountMax = simManager.getActiveSubscriptionInfoCountMax();

            List<SubscriptionInfo> subscriptionInfos = simManager.getActiveSubscriptionInfoList();

            for (SubscriptionInfo subInfo : subscriptionInfos) {
                WritableMap simCard = Arguments.createMap();

                CharSequence carrierName = subInfo.getCarrierName();
                String countryIso = subInfo.getCountryIso();
                int dataRoaming = subInfo.getDataRoaming();
                CharSequence displayName = subInfo.getDisplayName();
                String iccId = subInfo.getIccId();
                int mcc = subInfo.getMcc();
                int mnc = subInfo.getMnc();
                String number = subInfo.getNumber();
                int simSlotIndex = subInfo.getSimSlotIndex();
                int subscriptionId = subInfo.getSubscriptionId();

                simCard.putString("carrierName", carrierName.toString());
                simCard.putString("displayName", displayName.toString());
                simCard.putString("isoCountryCode", countryIso);
                simCard.putInt("mobileCountryCode", mcc);
                simCard.putInt("mobileNetworkCode", mnc);
                simCard.putInt("isDataRoaming", dataRoaming);
                simCard.putInt("simSlotIndex", simSlotIndex);
                simCard.putString("phoneNumber", number);
                simCard.putString("simSerialNumber", iccId);
                simCard.putInt("subscriptionId", subscriptionId);
                result.pushMap(simCard);
            }
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
