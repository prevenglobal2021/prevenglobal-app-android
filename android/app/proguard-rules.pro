# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# ---------------------------------------------------------------
# Prevenglobal: la app carga la plataforma web y le habla a los
# plugins nativos por nombre (reflexión). Se conservan completos los
# paquetes de Capacitor y de cada plugin para que R8 no quite nada que
# la web necesite. R8 sigue achicando AndroidX, Kotlin y Firebase.
# ---------------------------------------------------------------
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod,SourceFile,LineNumberTable
-keep class com.getcapacitor.** { *; }
-keep class com.capacitorjs.plugins.** { *; }
-keep class io.ionic.libs.** { *; }
-keep class ee.forgr.biometric.** { *; }
-keep class app.capgo.speechrecognition.** { *; }
-keep class io.capawesome.capacitorjs.plugins.** { *; }
-keep class com.prevenglobal.app.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-dontwarn org.apache.cordova.**
