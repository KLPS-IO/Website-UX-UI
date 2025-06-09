<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/header/google_analytics.twig */
class __TwigTemplate_3fca4460fff96b0ed7b1f6e741a59a22 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 17
        if (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", true, true, true, 17) && CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 17)) && CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsstyle", [], "any", false, false, true, 17))) {
            // line 18
            yield "    ";
            // line 19
            yield "    ";
            if ((is_string($__internal_compile_0 = CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 19)) && is_string($__internal_compile_1 = "UA-") && str_starts_with($__internal_compile_0, $__internal_compile_1))) {
                // line 20
                yield "        ";
                // line 21
                yield "        ";
                if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsstyle", [], "any", true, true, true, 21) && (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsstyle", [], "any", false, false, true, 21) == 1))) {
                    // line 22
                    yield "            <script>
            (function(i,s,o,g,r,a,m){ i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments) },i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', '";
                    // line 28
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 28), 28, $this->source);
                    yield "', 'auto');  // Replace with your property ID.
            ga('send', 'pageview');
            </script>
        ";
                } else {
                    // line 32
                    yield "            ";
                    $context["trackUrl"] = LS_Twig_Extension::getGoogleAnalyticsTrackingUrl($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sid", [], "any", false, false, true, 32), 32, $this->source), (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", true, true, true, 32) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", false, false, true, 32)))) ? (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", false, false, true, 32)) : ("")));
                    // line 33
                    yield "            <script>
            (function(i,s,o,g,r,a,m){ i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments) }
            ,i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', '";
                    // line 38
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 38), 38, $this->source);
                    yield "', 'auto');
            ga('send', 'pageview');
            ga('send', 'pageview', '";
                    // line 40
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(($context["trackUrl"] ?? null), 40, $this->source));
                    yield "');
            </script>
        ";
                }
                // line 43
                yield "    ";
            } else {
                // line 44
                yield "        ";
                // line 45
                yield "        <!-- Google tag (gtag.js) -->
        <script async src=\"https://www.googletagmanager.com/gtag/js?id=";
                // line 46
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 46), 46, $this->source);
                yield "\"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '";
                // line 52
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsapikey", [], "any", false, false, true, 52), 52, $this->source);
                yield "');

            ";
                // line 54
                if ( !(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsstyle", [], "any", true, true, true, 54) && (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "googleanalyticsstyle", [], "any", false, false, true, 54) == 1))) {
                    // line 55
                    yield "                ";
                    $context["trackUrl"] = LS_Twig_Extension::getGoogleAnalyticsTrackingUrl($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "sid", [], "any", false, false, true, 55), 55, $this->source), (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", true, true, true, 55) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", false, false, true, 55)))) ? (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "trackUrlPageName", [], "any", false, false, true, 55)) : ("")));
                    // line 56
                    yield "                gtag('event', 'page_view', { page_title: '";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(($context["trackUrl"] ?? null), 56, $this->source));
                    yield "' })
            ";
                }
                // line 58
                yield "        </script>
    ";
            }
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/google_analytics.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  121 => 58,  115 => 56,  112 => 55,  110 => 54,  105 => 52,  96 => 46,  93 => 45,  91 => 44,  88 => 43,  82 => 40,  77 => 38,  70 => 33,  67 => 32,  60 => 28,  52 => 22,  49 => 21,  47 => 20,  44 => 19,  42 => 18,  40 => 17,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/google_analytics.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/google_analytics.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 17, "set" => 32);
        static $filters = array("escape" => 40);
        static $functions = array("getGoogleAnalyticsTrackingUrl" => 32);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                ['escape'],
                ['getGoogleAnalyticsTrackingUrl'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
